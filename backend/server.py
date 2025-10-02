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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
