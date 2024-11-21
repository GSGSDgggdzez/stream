<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'Date_Birth' => 'required|date',
            'Location' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'gender' => $request->gender,
            'email' => $request->email,
            'Location' => $request->Location,
            'date_of_birth' => $request->Date_Birth,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('payment'));
    }


     //---------------------- these is to Provide location
     public function getLocations()
     {
         return Cache::remember('countries', 86400, function () {
             $token = env('LOCATION_API_KEY');
             $response = Http::withHeaders([
                 'Accept' => 'application/json',
                 'Authorization' => 'Bearer ' . $token,
             ])->get('https://restfulcountries.com/api/v1/countries');
     
             $data = $response->json();
             $countries = $data['data'] ?? [];
     
             return array_map(function($country) {
                 return [
                     'id' => $country['name'],
                     'name' => $country['name'],
                     'phone_code' => $country['phone_code'] ?? null,
                     'flag' => $country ['href']['flag'] ?? null,
                 ];
             }, $countries);
         });
     }
}
