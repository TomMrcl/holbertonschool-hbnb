#!/usr/bin/env python3
"""Seed script to initialize demo data in the database."""
from config import DevelopmentConfig
from app import create_app, db
from app.models.user import User
from app.models.amenity import Amenity
from app.models.place import Place
from app.models.review import Review

# Create app and context
app = create_app(DevelopmentConfig)

def seed_database():
    """Initialize database with demo data."""
    with app.app_context():
        # Check if database is already seeded
        existing_users = User.query.count()

        if existing_users > 0:
            print("[*] Database already contains data. Skipping seeding.")
            print(f"[*] Current database state:")
            print(f"    - Users: {User.query.count()}")
            print(f"    - Amenities: {Amenity.query.count()}")
            print(f"    - Places: {Place.query.count()}")
            print(f"    - Reviews: {Review.query.count()}")
            return

        # Create tables if they don't exist
        print("[*] Creating database tables...")
        db.create_all()

        # Create users
        print("[*] Creating demo users...")
        admin_user = User(
            first_name="John",
            last_name="Doe",
            email="admin@example.com",
            password="admin123",
            is_admin=True
        )
        regular_user = User(
            first_name="Jane",
            last_name="Smith",
            email="user@example.com",
            password="user123",
            is_admin=False
        )

        db.session.add(admin_user)
        db.session.add(regular_user)
        db.session.flush()  # Get the IDs without committing

        # Create amenities
        print("[*] Creating amenities...")
        amenities_data = [
            "WiFi", "Air Conditioning", "Heating", "Kitchen",
            "Parking", "Pool", "Gym", "Washer", "Dryer", "TV"
        ]
        amenities = []
        for name in amenities_data:
            amenity = Amenity(name=name)
            amenities.append(amenity)
            db.session.add(amenity)
        db.session.flush()

        # Create places
        print("[*] Creating places...")
        places_data = [
            {
                "title": "Cozy Apartment in Paris",
                "description": "Beautiful 2-bedroom apartment with stunning City views",
                "price": 150,
                "latitude": 48.8566,
                "longitude": 2.3522,
                "owner_id": admin_user.id,
                "amenity_indices": [0, 1, 2, 3]
            },
            {
                "title": "Spacious House in London",
                "description": "Modern house with garden and parking space",
                "price": 200,
                "latitude": 51.5074,
                "longitude": -0.1278,
                "owner_id": admin_user.id,
                "amenity_indices": [0, 1, 3, 4, 5]
            },
            {
                "title": "Sunny Villa in Barcelona",
                "description": "Luxury villa with pool and beach access",
                "price": 300,
                "latitude": 41.3851,
                "longitude": 2.1734,
                "owner_id": regular_user.id,
                "amenity_indices": [0, 1, 2, 3, 5, 6]
            },
            {
                "title": "Studio in Berlin",
                "description": "Trendy studio in the heart of Berlin",
                "price": 80,
                "latitude": 52.5200,
                "longitude": 13.4050,
                "owner_id": regular_user.id,
                "amenity_indices": [0, 1, 3]
            },
            {
                "title": "Penthouse in New York",
                "description": "Upscale penthouse with panoramic city views",
                "price": 500,
                "latitude": 40.7128,
                "longitude": -74.0060,
                "owner_id": admin_user.id,
                "amenity_indices": [0, 1, 2, 3, 6, 7]
            },
            {
                "title": "Cozy Cottage in Amsterdam",
                "description": "Traditional Dutch cottage with canal views",
                "price": 120,
                "latitude": 52.3676,
                "longitude": 4.9041,
                "owner_id": regular_user.id,
                "amenity_indices": [0, 1, 3, 4]
            }
        ]

        places = []
        for place_data in places_data:
            amenity_indices = place_data.pop("amenity_indices", [])
            place = Place(**place_data)

            # Add amenities
            for amenity_idx in amenity_indices:
                if amenity_idx < len(amenities):
                    place.amenities.append(amenities[amenity_idx])

            places.append(place)
            db.session.add(place)

        db.session.flush()

        # Create reviews
        print("[*] Creating reviews...")
        reviews_data = [
            {
                "text": "Great place! Clean and well-maintained. The host was very friendly.",
                "rating": 5,
                "place_id": places[0].id,
                "user_id": regular_user.id
            },
            {
                "text": "Nice location but a bit noisy at night.",
                "rating": 3,
                "place_id": places[0].id,
                "user_id": admin_user.id
            },
            {
                "text": "Excellent house! Perfect for a family vacation.",
                "rating": 5,
                "place_id": places[1].id,
                "user_id": regular_user.id
            },
            {
                "text": "Amazing villa with fantastic views!",
                "rating": 5,
                "place_id": places[2].id,
                "user_id": admin_user.id
            },
            {
                "text": "Good studio, very artistic neighborhood.",
                "rating": 4,
                "place_id": places[3].id,
                "user_id": admin_user.id
            }
        ]

        for review_data in reviews_data:
            review = Review(**review_data)
            db.session.add(review)

        # Commit everything
        db.session.commit()

        print("\n[+] Database seeded successfully!")
        print("\n[*] Summary:")
        print(f"  - Users: {User.query.count()}")
        print(f"  - Amenities: {Amenity.query.count()}")
        print(f"  - Places: {Place.query.count()}")
        print(f"  - Reviews: {Review.query.count()}")
        print("\n[*] Demo Credentials:")
        print("  Email: admin@example.com")
        print("  Password: admin123")
        print("\n  OR")
        print("  Email: user@example.com")
        print("  Password: user123")

if __name__ == "__main__":
    seed_database()
