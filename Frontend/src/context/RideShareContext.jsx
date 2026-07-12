/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const RideShareContext = createContext();

const initialUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 019-2834",
    password: "password123",
    role: "both",
    bio: "Love road trips and sharing conversations. Commute to Boston weekly.",
    avatar: "JD",
    rating: 4.8,
    reviewsCount: 24,
    vehicle: {
      make: "Toyota",
      model: "Camry Hybrid",
      year: "2022",
      color: "Midnight Black",
      plate: "MA-982-XYZ",
    },
  },
  {
    id: "user-2",
    name: "Sarah Connor",
    email: "sarah@example.com",
    phone: "+1 (555) 014-9844",
    password: "password123",
    role: "both",
    bio: "Eco-conscious driver. Safe trips down to LA. Coffee enthusiast.",
    avatar: "SC",
    rating: 4.9,
    reviewsCount: 42,
    vehicle: {
      make: "Tesla",
      model: "Model 3",
      year: "2023",
      color: "Pearl White",
      plate: "CA-777-WIN",
    },
  },
  {
    id: "user-3",
    name: "Alex Mercer",
    email: "alex@example.com",
    phone: "+1 (555) 012-7311",
    password: "password123",
    role: "passenger",
    bio: "Frequent traveler. Quiet passenger who respects the vehicle.",
    avatar: "AM",
    rating: 4.6,
    reviewsCount: 12,
    vehicle: null,
  },
];

const getFutureDate = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split("T")[0];
};

const initialRides = [
  {
    id: "ride-1",
    driverId: "user-1",
    driverName: "John Doe",
    driverAvatar: "JD",
    driverRating: 4.8,
    from: "New York",
    to: "Boston",
    date: getFutureDate(1),
    time: "08:00",
    price: 28,
    seatsTotal: 4,
    seatsAvailable: 3,
    vehicleInfo: "Toyota Camry Hybrid (Black)",
    description: "Leaving early morning. Split gas costs. Non-smokers preferred. Large trunk space available.",
    passengers: ["user-3"],
  },
  {
    id: "ride-2",
    driverId: "user-2",
    driverName: "Sarah Connor",
    driverAvatar: "SC",
    driverRating: 4.9,
    from: "San Francisco",
    to: "Los Angeles",
    date: getFutureDate(2),
    time: "09:30",
    price: 45,
    seatsTotal: 3,
    seatsAvailable: 3,
    vehicleInfo: "Tesla Model 3 (White)",
    description: "Direct trip down I-5. Charging stops included (15 mins). Spotify playlist is open to suggestions!",
    passengers: [],
  },
  {
    id: "ride-3",
    driverId: "user-1",
    driverName: "John Doe",
    driverAvatar: "JD",
    driverRating: 4.8,
    from: "Boston",
    to: "New York",
    date: getFutureDate(2),
    time: "17:00",
    price: 30,
    seatsTotal: 4,
    seatsAvailable: 4,
    vehicleInfo: "Toyota Camry Hybrid (Black)",
    description: "Evening drive back. Will drop off at central hubs or subway stops.",
    passengers: [],
  },
  {
    id: "ride-4",
    driverId: "user-2",
    driverName: "Sarah Connor",
    driverAvatar: "SC",
    driverRating: 4.9,
    from: "Los Angeles",
    to: "San Diego",
    date: getFutureDate(3),
    time: "14:00",
    price: 18,
    seatsTotal: 4,
    seatsAvailable: 4,
    vehicleInfo: "Tesla Model 3 (White)",
    description: "Weekend beach run. Nice and easy cruise.",
    passengers: [],
  },
  {
    id: "ride-5",
    driverId: "user-1",
    driverName: "John Doe",
    driverAvatar: "JD",
    driverRating: 4.8,
    from: "Chicago",
    to: "Detroit",
    date: getFutureDate(4),
    time: "10:15",
    price: 35,
    seatsTotal: 3,
    seatsAvailable: 3,
    vehicleInfo: "Toyota Camry Hybrid (Black)",
    description: "Business commute, quiet ride, perfect for working in the car.",
    passengers: [],
  },
];

const initialBookings = [
  {
    id: "booking-1",
    rideId: "ride-1",
    passengerId: "user-3",
    seatsBooked: 1,
    status: "confirmed",
    bookingDate: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const RideShareProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("rs_users");
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [rides, setRides] = useState(() => {
    const saved = localStorage.getItem("rs_rides");
    return saved ? JSON.parse(saved) : initialRides;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("rs_bookings");
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("rs_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("rs_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("rs_rides", JSON.stringify(rides));
  }, [rides]);

  useEffect(() => {
    localStorage.setItem("rs_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("rs_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("rs_current_user");
    }
  }, [currentUser]);

  // Auth Operations
  const registerUser = (userData) => {
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (emailExists) {
      throw new Error("Email already registered!");
    }

    const initials = userData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newUser = {
      id: `user-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      avatar: initials || "U",
      bio: "",
      role: "both",
      vehicle: null,
      ...userData,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const loginUser = (email, password) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      throw new Error("Invalid email or password!");
    }
    setCurrentUser(user);
    return user;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...profileData };
    
    // Update current user
    setCurrentUser(updatedUser);
    
    // Update user in users list
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );

    // Update driver names/details in rides list if driver
    setRides((prev) =>
      prev.map((r) => {
        if (r.driverId === currentUser.id) {
          return {
            ...r,
            driverName: updatedUser.name,
            driverAvatar: updatedUser.avatar,
            driverRating: updatedUser.rating,
          };
        }
        return r;
      })
    );
  };

  // Ride Operations
  const publishRide = (rideData) => {
    if (!currentUser) throw new Error("Must be logged in to publish a ride!");

    const newRide = {
      id: `ride-${Date.now()}`,
      driverId: currentUser.id,
      driverName: currentUser.name,
      driverAvatar: currentUser.avatar,
      driverRating: currentUser.rating,
      passengers: [],
      seatsAvailable: Number(rideData.seatsTotal),
      ...rideData,
      seatsTotal: Number(rideData.seatsTotal),
      price: Number(rideData.price),
    };

    setRides((prev) => [newRide, ...prev]);
    return newRide;
  };

  const cancelRide = (rideId) => {
    // Remove ride
    setRides((prev) => prev.filter((r) => r.id !== rideId));

    // Cancel related bookings
    setBookings((prev) =>
      prev.map((b) => (b.rideId === rideId ? { ...b, status: "cancelled" } : b))
    );
  };

  // Booking Operations
  const bookRide = (rideId, seatsCount = 1) => {
    if (!currentUser) throw new Error("Must be logged in to book a ride!");
    
    const ride = rides.find((r) => r.id === rideId);
    if (!ride) throw new Error("Ride not found!");
    if (ride.driverId === currentUser.id) {
      throw new Error("You cannot book your own ride!");
    }
    if (ride.seatsAvailable < seatsCount) {
      throw new Error("Not enough available seats!");
    }
    if (ride.passengers.includes(currentUser.id)) {
      throw new Error("You have already booked this ride!");
    }

    // Update ride passenger list and seats
    setRides((prev) =>
      prev.map((r) => {
        if (r.id === rideId) {
          return {
            ...r,
            seatsAvailable: r.seatsAvailable - seatsCount,
            passengers: [...r.passengers, currentUser.id],
          };
        }
        return r;
      })
    );

    // Create booking
    const newBooking = {
      id: `booking-${Date.now()}`,
      rideId,
      passengerId: currentUser.id,
      seatsBooked: seatsCount,
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error("Booking not found!");

    // Update booking status
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
    );

    // Restore seat count in the ride and remove from passenger list
    setRides((prev) =>
      prev.map((r) => {
        if (r.id === booking.rideId) {
          return {
            ...r,
            seatsAvailable: r.seatsAvailable + booking.seatsBooked,
            passengers: r.passengers.filter((pId) => pId !== booking.passengerId),
          };
        }
        return r;
      })
    );
  };

  return (
    <RideShareContext.Provider
      value={{
        users,
        rides,
        bookings,
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
        publishRide,
        cancelRide,
        bookRide,
        cancelBooking,
      }}
    >
      {children}
    </RideShareContext.Provider>
  );
};

export const useRideShare = () => {
  const context = useContext(RideShareContext);
  if (!context) {
    throw new Error("useRideShare must be used within a RideShareProvider");
  }
  return context;
};
