import React, { useState } from 'react';
import PaymentLayout from '@/Layouts/PaymentLayout';
import { Head } from '@inertiajs/react';

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  // Define available subscription plans with their features and pricing
  const plans = [
    {
      name: 'Basic',
      price: '2.99',
      quality: 'Good',
      resolution: '720p',
      devices: ['Phone', 'Tablet', 'Computer', 'TV'],
      features: ['Ad-free entertainment', 'Basic Streaming', 'Download on 1 device', 'Supported: Mobile phone, tablet'],
    },
    {
      name: 'Standard',
      price: '7.49',
      quality: 'Better',
      resolution: '1080p',
      devices: ['Phone', 'Tablet', 'Computer', 'TV'],
      features: ['Ad-free entertainment', 'HD Streaming', 'Watch on 2 devices', 'Download on 2 devices', 'Supported: TV, computer, mobile phone, tablet'],
    },
    {
      name: 'Premium',
      price: '10.99',
      quality: 'Best',
      resolution: '4K+HDR',
      devices: ['Phone', 'Tablet', 'Computer', 'TV'],
      features: ['Ad-free entertainment', 'Ultra HD Streaming', 'Watch on 4 devices', 'Download on 4 devices', 'High sound quality', 'Supported: TV, computer, mobile phone, tablet'],
    },
  ];

  // Handle plan selection when the user clicks on a plan card
  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName.toLowerCase());
  };

  return (
    <PaymentLayout>
      <Head title="Choose Your Plan" />
      <div className="py-12 text-white">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
              Choose the plan that's right for you
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded-lg p-8 cursor-pointer transition-all ${selectedPlan === plan.name.toLowerCase()
                    ? 'border-[#E50000] bg-[#E50000]/10'
                    : 'border-gray-700 hover:border-[#E50000]'
                    }`}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6 text-[#E50000]">${plan.price}</p>
                  <p className="text-gray-300 mb-2">Video quality: {plan.quality}</p>
                  <p className="text-gray-300 mb-6">Resolution: {plan.resolution}</p>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-[#E50000] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                className="bg-[#E50000] text-white px-12 py-4 rounded-md text-lg font-semibold hover:bg-[#E50000]/90 transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </PaymentLayout>
  );
}
