from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
import asyncio


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Rental System Models
class BusinessData(BaseModel):
    description: Optional[str] = ""
    services: List[str] = []
    logo: Optional[str] = ""
    theme: str = "blue"
    socialLinks: Dict[str, str] = {}

class RentalRequestCreate(BaseModel):
    businessName: str
    contactEmail: str
    contactPhone: str
    duration: str  # "1 week", "1 month", "3 months"
    businessData: BusinessData

class RentalRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    businessName: str
    contactEmail: str
    contactPhone: str
    duration: str
    durationType: str
    durationValue: int
    price: str
    status: str = "pending"
    requestDate: datetime = Field(default_factory=datetime.utcnow)
    approvalDate: Optional[datetime] = None
    expirationDate: Optional[datetime] = None
    uniqueSlug: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    businessData: BusinessData
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ActiveRental(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    rentalRequestId: str
    slug: str
    businessName: str
    businessData: BusinessData
    expirationDate: datetime
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    lastAccessed: datetime = Field(default_factory=datetime.utcnow)

class ApprovalRequest(BaseModel):
    approved: bool

# Utility functions
def parse_duration(duration: str):
    """Parse duration string and return type, value, and price"""
    duration_lower = duration.lower()
    
    if "week" in duration_lower or "semana" in duration_lower:
        if "1" in duration:
            return "week", 1, "$150"
    elif "month" in duration_lower or "mes" in duration_lower:
        if "1" in duration:
            return "month", 1, "$400"
        elif "3" in duration:
            return "month", 3, "$1000"
    
    # Default fallback
    return "month", 1, "$400"

def calculate_expiration_date(duration_type: str, duration_value: int) -> datetime:
    """Calculate expiration date based on duration"""
    now = datetime.utcnow()
    
    if duration_type == "week":
        return now + timedelta(weeks=duration_value)
    elif duration_type == "month":
        return now + timedelta(days=duration_value * 30)
    
    return now + timedelta(days=30)  # Default to 1 month

async def cleanup_expired_rentals():
    """Remove expired rentals"""
    try:
        now = datetime.utcnow()
        result = await db.active_rentals.delete_many({
            "expirationDate": {"$lt": now}
        })
        if result.deleted_count > 0:
            logger.info(f"Cleaned up {result.deleted_count} expired rentals")
    except Exception as e:
        logger.error(f"Error cleaning up expired rentals: {e}")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Rental System Endpoints
@api_router.post("/rental-requests", response_model=RentalRequest)
async def create_rental_request(request_data: RentalRequestCreate):
    """Create a new rental request"""
    try:
        # Parse duration and calculate price
        duration_type, duration_value, price = parse_duration(request_data.duration)
        
        # Create rental request object
        rental_request = RentalRequest(
            **request_data.dict(),
            durationType=duration_type,
            durationValue=duration_value,
            price=price
        )
        
        # Save to database
        await db.rental_requests.insert_one(rental_request.dict())
        
        logger.info(f"Created rental request for {rental_request.businessName}")
        return rental_request
        
    except Exception as e:
        logger.error(f"Error creating rental request: {e}")
        raise HTTPException(status_code=500, detail="Error creating rental request")

@api_router.get("/rental-requests", response_model=List[RentalRequest])
async def get_rental_requests():
    """Get all rental requests (admin use)"""
    try:
        requests = await db.rental_requests.find().to_list(1000)
        return [RentalRequest(**req) for req in requests]
    except Exception as e:
        logger.error(f"Error fetching rental requests: {e}")
        raise HTTPException(status_code=500, detail="Error fetching rental requests")

@api_router.post("/rental-requests/{request_id}/approve")
async def approve_rental_request(request_id: str, approval: ApprovalRequest):
    """Approve or reject a rental request"""
    try:
        # Find the rental request
        rental_request_data = await db.rental_requests.find_one({"id": request_id})
        if not rental_request_data:
            raise HTTPException(status_code=404, detail="Rental request not found")
        
        rental_request = RentalRequest(**rental_request_data)
        
        if approval.approved:
            # Update request status
            approval_date = datetime.utcnow()
            expiration_date = calculate_expiration_date(
                rental_request.durationType, 
                rental_request.durationValue
            )
            
            await db.rental_requests.update_one(
                {"id": request_id},
                {
                    "$set": {
                        "status": "active",
                        "approvalDate": approval_date,
                        "expirationDate": expiration_date,
                        "updatedAt": datetime.utcnow()
                    }
                }
            )
            
            # Create active rental
            active_rental = ActiveRental(
                rentalRequestId=request_id,
                slug=rental_request.uniqueSlug,
                businessName=rental_request.businessName,
                businessData=rental_request.businessData,
                expirationDate=expiration_date
            )
            
            await db.active_rentals.insert_one(active_rental.dict())
            
            logger.info(f"Approved rental request for {rental_request.businessName}")
            return {
                "message": "Rental request approved",
                "activeRental": active_rental,
                "rentalUrl": f"/rental/{rental_request.uniqueSlug}"
            }
        else:
            # Reject request
            await db.rental_requests.update_one(
                {"id": request_id},
                {
                    "$set": {
                        "status": "rejected",
                        "updatedAt": datetime.utcnow()
                    }
                }
            )
            
            return {"message": "Rental request rejected"}
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error approving rental request: {e}")
        raise HTTPException(status_code=500, detail="Error processing approval")

@api_router.get("/active-rentals", response_model=List[ActiveRental])
async def get_active_rentals():
    """Get all active rentals"""
    try:
        # Clean up expired rentals first
        await cleanup_expired_rentals()
        
        # Get active rentals
        rentals = await db.active_rentals.find({"isActive": True}).to_list(1000)
        return [ActiveRental(**rental) for rental in rentals]
    except Exception as e:
        logger.error(f"Error fetching active rentals: {e}")
        raise HTTPException(status_code=500, detail="Error fetching active rentals")

@api_router.get("/rental/{slug}")
async def get_rental_site(slug: str):
    """Get rental site data by slug"""
    try:
        # Clean up expired rentals first
        await cleanup_expired_rentals()
        
        # Find active rental by slug
        rental_data = await db.active_rentals.find_one({
            "slug": slug,
            "isActive": True,
            "expirationDate": {"$gt": datetime.utcnow()}
        })
        
        if not rental_data:
            raise HTTPException(status_code=404, detail="Rental site not found or expired")
        
        # Update last accessed time
        await db.active_rentals.update_one(
            {"slug": slug},
            {"$set": {"lastAccessed": datetime.utcnow()}}
        )
        
        rental = ActiveRental(**rental_data)
        
        return {
            "businessName": rental.businessName,
            "businessData": rental.businessData,
            "expirationDate": rental.expirationDate,
            "isActive": rental.isActive
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching rental site {slug}: {e}")
        raise HTTPException(status_code=500, detail="Error fetching rental site")

@api_router.delete("/active-rentals/{rental_id}")
async def delete_active_rental(rental_id: str):
    """Delete an active rental"""
    try:
        result = await db.active_rentals.delete_one({"id": rental_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Active rental not found")
        
        return {"message": "Active rental deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting active rental: {e}")
        raise HTTPException(status_code=500, detail="Error deleting active rental")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Background task for cleanup
async def periodic_cleanup():
    """Periodic cleanup of expired rentals"""
    while True:
        try:
            await cleanup_expired_rentals()
            # Run cleanup every hour
            await asyncio.sleep(3600)
        except Exception as e:
            logger.error(f"Error in periodic cleanup: {e}")
            await asyncio.sleep(3600)

@app.on_event("startup")
async def startup_event():
    """Start background tasks"""
    # Start periodic cleanup task
    asyncio.create_task(periodic_cleanup())
    logger.info("Started background cleanup task")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
