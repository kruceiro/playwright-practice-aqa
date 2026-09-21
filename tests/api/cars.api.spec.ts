import { test, expect } from '@playwright/test';
import AuthController from '../../controllers/AuthController';
import CarsController from '../../controllers/CarsController';

let authController: AuthController;
let carsController: CarsController;

test.describe('Cars API tests', () => {
    let sid: string;
    const addedCars: number[] = [];

    test.beforeAll(async ({ request }) => {
        authController = new AuthController();
        carsController = new CarsController();

        const response = await authController.signIn(
            request,
            process.env.USER_EMAIL!,
            process.env.USER_PASSWORD!
        );

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();
        sid = responseHeaders['set-cookie'].split(';')[0].split('=')[1];
    });

    test('Create car with valid data', async ({ request }) => {
        const car = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 1000
        };

        const response = await carsController.addCar(
            request,
            car.carBrandId,
            car.carModelId,
            car.mileage,
            sid
        );

        const responseBody = await response.json();

        expect(response.status()).toBe(201);
        expect(responseBody.data.carBrandId).toBe(car.carBrandId);
        expect(responseBody.data.carModelId).toBe(car.carModelId);
        expect(responseBody.data.mileage).toBe(car.mileage);

        addedCars.push(responseBody.data.id);
    });

    test('Create car with invalid brand id', async ({ request }) => {
        const response = await carsController.addCar(
            request,
            999999,
            1,
            1000,
            sid
        );

        expect(response.ok()).toBeFalsy();
    });

    test('Create car with negative mileage', async ({ request }) => {
        const response = await carsController.addCar(
            request,
            1,
            1,
            -100,
            sid
        );

        expect(response.ok()).toBeFalsy();
    });

    test.afterAll(async ({ request }) => {
        for (const carId of addedCars) {
            const response = await carsController.deleteCar(request, carId, sid);
            expect(response.status()).toBe(200);
        }
    });
});