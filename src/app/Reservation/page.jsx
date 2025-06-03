
"use client";

import React, { useState } from 'react';
import {
    Radio,
    Slider,
    DatePicker,
    TimePicker,
    Button,
    Rate,
    Card
} from 'antd';
import {
    CarOutlined,
    EnvironmentOutlined,
    UserOutlined,
    DatabaseOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function CarRental() {
    const [transmission, setTransmission] = useState('automatic');
    const [seats, setSeats] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();

    const carData = [
        {
            id: 1,
            name: 'MASERATI GRANTURISMO',
            price: '109,999',
            rating: 4.8,
            reviews: 162,
            seats: 6,
            doors: 2,
            transmission: 'Automatic',
            image: '/images/maserati.png'
        },
        {
            id: 2,
            name: 'HYUNDAI',
            price: '109,999',
            rating: 4.8,
            reviews: 162,
            seats: 6,
            doors: 2,
            transmission: 'Automatic',
            image: '/images/maserati.png'
        },
        {
            id: 3,
            name: 'MERCEDES-BENZ',
            price: '109,999',
            rating: 4.8,
            reviews: 162,
            seats: 6,
            doors: 2,
            transmission: 'Automatic',
            image: '/images/maserati.png'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    <CarOutlined className="mr-2" />
                    <h2 className="text-lg font-semibold">Choose your car</h2>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left sidebar */}
                <div className="md:w-1/4 ">
                    <div className="mb-8 border border-gray-200 rounded-md p-5">
                        <h3 className="font-bold mb-4 border-b border-gray-200 pb-5">Location</h3>

                        <div className="mb-4">
                            <p className="font-semibold mb-2">Pick-up</p>
                            <div className="flex items-start mb-2">
                                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                                <div>
                                    <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                                </div>
                            </div>
                            <div className="flex items-center ml-6 gap-3">
                                <DatePicker
                                    size="small"
                                    defaultValue={dayjs('2025-03-25')}
                                    format="DD/MM/YYYY"
                                    className="mr-2 w-32"
                                />
                                <TimePicker
                                    size="small"
                                    defaultValue={dayjs('12:00', 'HH:mm')}
                                    format="HH:mm"
                                    className="w-24"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">Return</p>
                            <div className="flex items-start mb-2">
                                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                                <div>
                                    <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                                </div>
                            </div>
                            <div className="flex items-center ml-6 gap-3">
                                <DatePicker
                                    size="small"
                                    defaultValue={dayjs('2025-03-26')}
                                    format="DD/MM/YYYY"
                                    className="mr-2 w-32"
                                />
                                <TimePicker
                                    size="small"
                                    defaultValue={dayjs('16:00', 'HH:mm')}
                                    format="HH:mm"
                                    className="w-24"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='border p-5 border-gray-200 rounded-md'>
                        <div className="mb-4 pb-2 border-b border-gray-200">
                            <h3 className="font-bold mb-4">Filter</h3>
                        </div>

                        <div className="mb-8 ">
                            <h3 className="font-bold mb-2">Price:</h3>
                            <Slider
                                range
                                defaultValue={[50, 500]}
                                min={50}
                                max={500}
                                trackStyle={[{ backgroundColor: '#10B981' }]}
                                handleStyle={[
                                    { borderColor: '#10B981', backgroundColor: '#10B981' },
                                    { borderColor: '#10B981', backgroundColor: '#10B981' }
                                ]}
                            />
                            <div className="flex justify-between mt-2">
                                <span>$50</span>
                                <span>$ 500</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-bold mb-2">Transmission Type</h3>
                            <Radio.Group onChange={e => setTransmission(e.target.value)} value={transmission}>
                                <Radio value="automatic" className="block mb-2">
                                    <div className="flex items-center">
                                        Automatic
                                    </div>
                                </Radio>
                                <Radio value="manual" className="block">
                                    <div className="flex items-center">
                                        Manual
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </div>

                        <div>
                            <h3 className="font-bold mb-2">Seats Required</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[2, 3, 4, 5, 6, 7].map(num => (
                                    <div
                                        key={num}
                                        className={`flex justify-center items-center py-2 cursor-pointer text-center ${seats === num ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
                                        onClick={() => setSeats(num)}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="md:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array(9).fill(0).map((_, index) => {
                            const car = carData[index % 3];
                            return (
                                <div key={index} className="mb-8">
                                    <Card
                                        hoverable
                                        cover={<img alt={car.name} src={car.image} className="w-full object-cover" />}
                                        style={{ padding: '12px' }}
                                        className="h-full"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center">
                                                <Rate disabled defaultValue={car.rating} className="text-xs" />
                                                <span className="text-xs text-gray-500 ml-1">({car.reviews} Reviews)</span>
                                            </div>
                                        </div>

                                        <h3 className="font-bold mb-1">{car.name}</h3>
                                        <p className="text-xs text-gray-500 mb-1">Starts From</p>
                                        <p className="text-green-500 font-bold mb-2">₦ {car.price}/Day</p>

                                        <div className="flex justify-between mb-3">
                                            <div className="flex items-center">
                                                <UserOutlined className="mr-1 text-gray-500" />
                                                <span className="text-xs">{car.seats} Seats</span>
                                            </div>
                                            <div className="flex items-center">
                                                <DatabaseOutlined className="mr-1 text-gray-500" />
                                                <span className="text-xs">{5}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-3">
                                            <div className="flex items-center">
                                                <CarOutlined className="mr-1 text-gray-500" />
                                                <span className="text-xs">{car.doors} Doors</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-xs">{car.transmission}</span>
                                            </div>
                                        </div>

                                        <Button
                                        onClick={()=>router.push('/booking-extras')}
                                            className="Vehicles"
                                            block
                                        >
                                            BOOK NOW
                                        </Button>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <ul className="flex">
                            <li className={`mx-1 w-8 h-8 flex items-center justify-center rounded-md ${currentPage === 1 ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                                <button className="w-full h-full" onClick={() => setCurrentPage(1)}>1</button>
                            </li>
                            <li className="mx-1 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                                <button className="w-full h-full" onClick={() => setCurrentPage(2)}>2</button>
                            </li>
                            <li className="mx-1 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                                <button className="w-full h-full" onClick={() => setCurrentPage(3)}>3</button>
                            </li>
                            <li className="mx-1 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                                <button className="w-full h-full">
                                    <ArrowRightOutlined />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}