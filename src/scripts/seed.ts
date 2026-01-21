import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import {
  ListingType,
  PropertyEntity,
  PropertyStatus,
} from '../modules/property/property.entity';
import { Unit } from '../modules/unit/unit.entity';
import { UnitPricing } from '../modules/unit/unit-pricing.entity';
import { UserEntity, UserRole } from '../modules/users/user.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'staging',
    password: process.env.DATABASE_PASSWORD || '!staging_password!',
    database: process.env.DATABASE_NAME || 'staging',
    entities: [UserEntity, PropertyEntity, Unit],
    synchronize: true,
  });

  //   const dataSource = new DataSource({
  //     type: 'postgres',
  //     host: process.env.DATABASE_HOST || 'localhost',
  //     port: Number(process.env.DATABASE_PORT) || 5432,
  //     username: process.env.DATABASE_USER || 'staging',
  //     password: process.env.DATABASE_PASSWORD || '!staging_password!',
  //     database: process.env.DATABASE_NAME || 'staging',
  //     entities: [UserEntity, PropertyEntity, Unit],
  //     synchronize: true,
  //   });

  await dataSource.initialize();
  console.log('Database connected');

  const userRepository = dataSource.getRepository(UserEntity);
  const propertyRepository = dataSource.getRepository(PropertyEntity);
  const unitRepository = dataSource.getRepository(Unit);

  // Create 5 dummy users (landlords)
  const users: UserEntity[] = [];
  const timestamp = Date.now();
  for (let i = 1; i <= 5; i++) {
    const user = new UserEntity();
    user.email = `landlord${i}_${timestamp}@example.com`;
    user.password = await bcrypt.hash('password123', 10);
    user.firstName = `Landlord${i}`;
    user.lastName = `User${i}`;
    user.phoneNumber = `+123456789${i}`;
    user.role = UserRole.LANDLORD;
    user.isVerified = true;
    users.push(await userRepository.save(user));
  }
  console.log('Landlords created');

  // Create 15 dummy tenant users
  const tenants: UserEntity[] = [];
  for (let i = 1; i <= 20; i++) {
    const tenant = new UserEntity();
    tenant.email = `tenant${i}_${timestamp}@example.com`;
    tenant.password = await bcrypt.hash('password123', 10);
    tenant.firstName = `Tenant${i}`;
    tenant.lastName = `User${i}`;
    tenant.phoneNumber = `+198765432${i}`;
    tenant.role = UserRole.TENANT;
    tenant.isVerified = true;
    tenants.push(await userRepository.save(tenant));
  }
  console.log('Tenants created');

  // Create 20 dummy properties
  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'];
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const towns = [
    'Springfield',
    'Rivertown',
    'Hillcrest',
    'Oakwood',
    'Maple Valley',
  ];
  const suburbs = ['Downtown', 'Uptown', 'Midtown', 'Suburbia', 'Countryside'];

  for (let i = 1; i <= 20; i++) {
    const property = new PropertyEntity();
    property.title = `Beautiful ${propertyTypes[i % propertyTypes.length]} in ${towns[i % towns.length]}`;
    property.listingType = i % 2 === 0 ? ListingType.RENT : ListingType.SELL;
    property.owner = users[i % users.length];
    property.status =
      i % 2 === 0 ? PropertyStatus.ACTIVE : PropertyStatus.LISTED;
    property.propertyType = propertyTypes[i % propertyTypes.length];
    property.description = `This is a lovely ${propertyTypes[i % propertyTypes.length].toLowerCase()} with modern amenities and great location. Perfect for families or professionals.`;
    property.address = `${i} Main Street`;
    property.region = regions[i % regions.length];
    property.town = towns[i % towns.length];
    property.suburb = suburbs[i % suburbs.length];
    property.images = [
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
    ];

    const savedProperty = await propertyRepository.save(property);

    // Create 1-5 units for each property
    const numUnits = Math.floor(Math.random() * 5) + 2;
    for (let j = 1; j <= numUnits; j++) {
      const unit = new Unit();
      unit.unitName = `${savedProperty.propertyType} ${j}`;
      unit.sizeSqFt = Math.floor(Math.random() * 2000) + 500; // 500-2500 sq ft
      unit.bedrooms = Math.floor(Math.random() * 4) + 1; // 1-4 bedrooms
      unit.bathrooms = Math.floor(Math.random() * 3) + 1; // 1-3 bathrooms
      unit.petFriendly = Math.random() > 0.5;
      unit.parkingSpace = Math.random() > 0.3;
      unit.furnished = Math.random() > 0.6;
      unit.available = Math.random() > 0.2;

      // Only add tenant to the first unit of a property
      if (j === 1) unit.tenant = tenants[i];

      // Unit pricing
      const pricing = new UnitPricing();
      pricing.rentAmount = Math.floor(Math.random() * 5000) + 1000; // 1000-6000
      pricing.securityDeposit = pricing.rentAmount * 2;
      pricing.utilitiesIncluded = Math.random() > 0.5;
      pricing.utilitiesBreakdown = pricing.utilitiesIncluded
        ? 'All utilities included'
        : 'Electricity and water not included';
      pricing.currency = 'N$';

      unit.pricing = pricing;
      unit.property = savedProperty;

      await unitRepository.save(unit);
    }
  }
  console.log('Properties and units created');

  await dataSource.destroy();
  console.log('Seeding completed');
}

seed().catch(console.error);
