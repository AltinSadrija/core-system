<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    protected $fillable = [
        'fullName',
        'username',
        'email',
        'password',
        'contact',
        'role',
        'company',
        'country',
        'status',
        'currentPlan',
        'avatar',
    ];

    protected $hidden = [
        'password',
    ];
}
