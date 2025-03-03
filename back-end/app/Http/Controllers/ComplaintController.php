<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Complaint;

class ComplaintController extends Controller
{
    public function store(Request $request)
    {
        // التحقق من صحة البيانات المدخلة
        $validatedData = $request->validate([
            'complaint_text' => 'required|string|max:500',
        ]);

        // إنشاء شكوى جديدة
        $complaint = new Complaint();
        $complaint->complaint_text = $validatedData['complaint_text'];
        $complaint->status = 'pending'; // حالة الشكوى في البداية
        $complaint->save();

        return response()->json(['message' => 'Complaint submitted successfully'], 201);
    }


    public function index()
    {
        return Complaint::orderBy('created_at', 'desc')->get(); // إرجاع الشكاوى بترتيب زمني تنازلي
    }


    public function deleteAll()
{
    try {
        Complaint::truncate(); // حذف جميع السجلات من جدول الشكاوى
        return response()->json(['message' => 'تم حذف جميع الشكاوى بنجاح.'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'حدث خطأ أثناء حذف الشكاوى.'], 500);
    }
}

}

