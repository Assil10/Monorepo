const express = require('express');
const router = express.Router();

// Static list of mock properties
const mockProperties = [
  {
    id: "PROP123456",
    name: "Oceanview Villas",
    type: "house",
    description: "A beautiful villa near the beach with stunning views.",
    status: "open",
    upload_date: "2025-03-12",
    rooms: 4,
    bathrooms: 3,
    area: 210,
    location: "California, USA",
    images: [
      "https://cdn.korpor.com/images/prop123_img1.jpg",
      "https://cdn.korpor.com/images/prop123_img2.jpg"
    ],
    total_needed: 500000,
    current_funded: 350000,
    funding_percentage: 70,
    funding_status: "active",
    purchase_price: 400000,
    current_value: 520000,
    annual_return_rate: 8.5,
    monthly_rent: 2500,
    dividends: 4250,
    min_investment: 500,
    expected_roi: 12.5
  },
  {
    id: "PROP789012",
    name: "Downtown Loft",
    type: "apartment",
    description: "Modern loft in the heart of the city.",
    status: "funded",
    upload_date: "2024-11-01",
    rooms: 2,
    bathrooms: 1,
    area: 95,
    location: "New York, USA",
    images: [
      "https://cdn.korpor.com/images/prop789_img1.jpg"
    ],
    total_needed: 300000,
    current_funded: 300000,
    funding_percentage: 100,
    funding_status: "closed",
    purchase_price: 250000,
    current_value: 310000,
    annual_return_rate: 6.0,
    monthly_rent: 1800,
    dividends: 3000,
    min_investment: 1000,
    expected_roi: 9.0
  },
    {
    id: "PROP333444",
    name: "Suburban Family Home",
    type: "house",
    description: "Spacious family home in a quiet neighborhood.",
    status: "open",
    upload_date: "2025-01-20",
    rooms: 5,
    bathrooms: 3,
    area: 250,
    location: "Texas, USA",
    images: [
      "https://cdn.korpor.com/images/prop333_img1.jpg",
      "https://cdn.korpor.com/images/prop333_img2.jpg",
      "https://cdn.korpor.com/images/prop333_img3.jpg"
    ],
    total_needed: 450000,
    current_funded: 100000,
    funding_percentage: 22.2,
    funding_status: "active",
    purchase_price: 400000,
    current_value: 460000,
    annual_return_rate: 7.5,
    monthly_rent: null, // Not rented yet
    dividends: null,
    min_investment: 200,
    expected_roi: 11.0
  }
];

/**
 * @swagger
 * tags:
 *   name: Mobile App
 *   description: Endpoints specifically for the mobile application
 */

/**
 * @swagger
 * /api/property/{id}:
 *   get:
 *     summary: Get property details by ID for mobile app card
 *     tags: [Mobile App]
 *     description: Returns detailed information about a specific property from a static list, tailored for display in the mobile app's property card component.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the property (e.g., PROP123456, PROP789012, PROP333444, or ERROR for testing 500 error)
 *     responses:
 *       200:
 *         description: Detailed property information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property' # Reference the schema definition
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "PROP123456"
 *           description: Unique identifier of the property
 *         name:
 *           type: string
 *           example: "Oceanview Villas"
 *           description: Name/title of the property
 *         description:
 *           type: string
 *           example: "A beautiful villa near the beach with stunning views."
 *           description: Short description of the property
 *         type:
 *           type: string
 *           example: "house"
 *           description: Type of the property (house, apartment, commercial, etc.)
 *         status:
 *           type: string
 *           example: "open"
 *           description: Current investment status (open, funded, sold, etc.)
 *         upload_date:
 *           type: string
 *           format: date
 *           example: "2025-03-12"
 *           description: Date the property was listed
 *         rooms:
 *           type: integer
 *           nullable: true
 *           example: 4
 *           description: Number of rooms (null if not applicable)
 *         bathrooms:
 *           type: integer
 *           nullable: true
 *           example: 3
 *           description: Number of bathrooms (null if not applicable)
 *         area:
 *           type: number
 *           format: float
 *           example: 210
 *           description: Surface area (in m² or ft²)
 *         location:
 *           type: string
 *           example: "California, USA"
 *           description: Address or region
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: url
 *           example: ["https://cdn.korpor.com/images/prop123_img1.jpg", "https://cdn.korpor.com/images/prop123_img2.jpg"]
 *           description: Array of image URLs
 *         total_needed:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 500000
 *           description: Total amount of funding required (null if not applicable)
 *         current_funded:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 350000
 *           description: Amount funded so far (null if not applicable)
 *         funding_percentage:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 70
 *           description: Percentage funded (null if not applicable)
 *         funding_status:
 *           type: string
 *           nullable: true
 *           example: "active"
 *           description: Funding status (active, closed, paused, etc., null if not applicable)
 *         purchase_price:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 400000
 *           description: Original purchase price (null if not applicable)
 *         current_value:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 520000
 *           description: Current estimated market value (null if not applicable)
 *         annual_return_rate:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 8.5
 *           description: Expected yearly return on investment (in %, null if not applicable)
 *         monthly_rent:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 2500
 *           description: Monthly rent income (null if not generating income)
 *         dividends:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 4250
 *           description: Estimated yearly investor dividends (null if not applicable)
 *         min_investment:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 500
 *           description: Minimum amount an investor can contribute (null if not applicable)
 *         expected_roi:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 12.5
 *           description: Expected total return on investment (null if not applicable)
 */
router.get('/property/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Fetching property with ID: ${id}`);

  // Simulate server error
  if (id === "ERROR") { // Example condition for error
      return res.status(500).json({ message: 'Internal server error simulation' });
  }

  // Find property in the mock list
  const property = mockProperties.find(p => p.id === id);

  if (property) {
    res.status(200).json(property);
  } else {
    // Simulate property not found
    res.status(404).json({ message: `Property with ID ${id} not found` });
  }
});

module.exports = router; 