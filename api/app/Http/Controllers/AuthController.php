<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return $user = User::create([
            'fullName' => $request->fullName,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contact' => $request->contact,
            'role' => $request->role,
            'company' => $request->company,
            'country' => $request->country,
            'status' => $request->status,
            'currentPlan' => $request->currentPlan,
            'avatar' => $request->avatar,
        ]);
    }
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();

        $token = $user->createToken('accessToken')->plainTextToken;

        $cookie = cookie('accessToken', $token, 60 * 24);

        return response([
            'message' => 'Success',
            "token" => $token,
        ])->withCookie($cookie);
    }

    public function userId(Request $request)
    {
        $user = User::where('id', $request->id)->first();

        return response()->json
            (
            [
                'user' => $user,
                'request' => $request->all()]
        );
    }

    public function user()
    {
        return $user = Auth::user();
    }

    public function users()
    {
        $all_users = User::get();
        return response
            ($all_users->toArray()

        );

    }

    public function usersData(Request $request)
    {
        $all_users = User::get()->toArray();

        $perPage = $request->perPage;

        // Get the current page from the query parameters (default to 1 if not specified)
        $page = $request->page;

        // Calculate the offset for slicing the array

        $roleFilter = $request->role;
        $statusFilter = $request->status;
        $currentPlanFilter = $request->currentPlan;
        $searchFilter = $request->q;

        $filteredUsers = $all_users;

        if ($statusFilter) {
            $filteredUsers = array_filter($filteredUsers, function ($user) use ($statusFilter) {
                return $user['status'] === $statusFilter;
            });
        }

        if ($roleFilter) {
            $filteredUsers = array_filter($filteredUsers, function ($user) use ($roleFilter) {
                return $user['role'] === $roleFilter;
            });
        }

        if ($currentPlanFilter) {
            $filteredUsers = array_filter($filteredUsers, function ($user) use ($currentPlanFilter) {
                return $user['currentPlan'] === $currentPlanFilter;
            });
        }

        if ($searchFilter) {
            $filteredUsers = array_filter($filteredUsers, function ($user) use ($searchFilter) {
                // Perform a case-insensitive search in user's full name, username, or email
                return str_contains(strtolower($user['fullName']), strtolower($searchFilter))
                || str_contains(strtolower($user['username']), strtolower($searchFilter));
            });
        }

        $offset = ($page - 1) * $perPage;

        // Get a slice of the array for the current page
        $usersForPage = array_slice($filteredUsers, $offset, $perPage);

        // Create a Paginator instance
        $usersPaginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $usersForPage,
            count($all_users), // Total count of items
            $perPage,
            $page
        );

        // You can customize the view used for pagination links if needed

        // Return the paginated data as JSON response
        return response()->json([
            'users' => $usersPaginator,
            'total' => count($filteredUsers),
        ]);
    }

    public function logout()
    {
        $cookie = Cookie::forget('accessToken');
        return response([
            'message' => 'Success',
        ])->withCookie($cookie);
    }
}
