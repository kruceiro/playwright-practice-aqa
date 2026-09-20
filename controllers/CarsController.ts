export default class CarsController {

    async getBrands(request: any) {
        const response = await request.get('/api/cars/brands');
        return response;
    }

    async getModels(request: any) {
        const response = await request.get(`/api/cars/models`);
        return response;
    }

    async addCar(request: any, carBrandId: number, carModelId: number, mileage: number, sid: string) {
        const car = {
            carBrandId,
            carModelId,
            mileage
        };
        const response = await request.post('/api/cars', {
            data: car,
            headers: {
                'Cookie': `sid=${sid}`
            }
        })
        return response;
    }

    async deleteCar(request: any, carId: number, sid: string) {
        const response = await request.delete(`/api/cars/${carId}`, {
            headers: {
                'Cookie': `sid=${sid}`
            }
        })
        return response;
    }

    async getUserCars(request: any, sid: string) {
        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        })
        return response;

    }
}