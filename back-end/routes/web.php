<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/', function () {
    return response()->json([
        'message' => 'Technology Cafe API is running successfully'
    ]);
});

// عرض صفحة التحقق من البريد الإلكتروني
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

// تحقق البريد الإلكتروني
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

// إعادة إرسال رابط التحقق
Route::post('/email/verification-notification', function () {
    auth()->user()->sendEmailVerificationNotification();
    return back()->with('message', 'تم إرسال رابط التحقق!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');