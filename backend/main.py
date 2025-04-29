from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",  # React/Vue/Angular frontend
    "https://yourfrontend.com",  # Deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,  # Allow cookies and authentication
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mock data for demonstration purposes
mock_inventory = [
    {"product_id": 1, "location_id": 1, "stock_level": 100, "threshold": 20, "last_updated": datetime.now()},
    {"product_id": 2, "location_id": 1, "stock_level": 50, "threshold": 10, "last_updated": datetime.now()},
]

mock_sales = [
    {"sale_id": 1, "product_id": 1, "quantity": 10, "sale_date": "2023-10-01", "location_id": 1},
    {"sale_id": 2, "product_id": 2, "quantity": 5, "sale_date": "2023-10-02", "location_id": 1},
]

mock_users = [
    {"user_id": 1, "name": "Admin", "email": "admin@example.com", "role": "admin", "password": "admin"},
]

# Pydantic models
class Inventory(BaseModel):
    product_id: int
    location_id: int
    stock_level: int
    threshold: int
    last_updated: datetime

class SalesTrend(BaseModel):
    product_id: int
    sales_volume: int
    time_period: str

class User(BaseModel):
    name: str
    email: str
    role: str
    password: str

class Notification(BaseModel):
    product_id: int
    current_stock_level: int

class Login(BaseModel):
    username: str
    password: str

# Dependency to get the current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    user = next((user for user in mock_users if user["email"] == token), None)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    return user

# Token endpoint for OAuth2
@app.post("/token")
async def login(login_data: Login):
    user = next((user for user in mock_users if user["email"] == login_data.username and user["password"] == login_data.password), None)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    return {"access_token": user["email"], "token_type": "bearer"}

# Inventory Management Endpoint
@app.get("/api/inventory", response_model=List[Inventory])
async def get_inventory(location_id: Optional[int] = None, current_user: User = Depends(get_current_user)):
    if location_id:
        inventory = [item for item in mock_inventory if item["location_id"] == location_id]
        if not inventory:
            raise HTTPException(status_code=404, detail="Location not found")
        return inventory
    return mock_inventory

# Restocking Alerts Endpoint
@app.post("/api/alerts/restocking")
async def create_restocking_alert(notification: Notification, current_user: User = Depends(get_current_user)):
    # Logic to send notification (e.g., email, SMS) would go here
    return {"message": "Alert sent successfully"}

# Sales Trend Analysis Endpoint
@app.get("/api/sales/trends", response_model=List[SalesTrend])
async def get_sales_trends(start_date: str, end_date: str, current_user: User = Depends(get_current_user)):
    # Logic to analyze sales trends would go here
    sales_trends = [
        {"product_id": 1, "sales_volume": 100, "time_period": f"{start_date} to {end_date}"},
        {"product_id": 2, "sales_volume": 50, "time_period": f"{start_date} to {end_date}"},
    ]
    return sales_trends

# User Management Endpoint
@app.post("/api/users")
async def create_user(user: User, current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Permission denied")
    mock_users.append(user.dict())
    return {"message": "User created successfully"}

# Integration with ERP Systems Endpoint
@app.post("/api/integration/erp")
async def push_inventory_to_erp(data: dict, current_user: User = Depends(get_current_user)):
    # Logic to push data to ERP system would go here
    return {"message": "Data pushed successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
