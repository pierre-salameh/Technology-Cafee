<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التحقق من البريد الإلكتروني</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h3>التحقق من البريد الإلكتروني</h3>
            </div>
            <div class="card-body">
                <p>شكراً لتسجيلك! قبل أن نبدأ، يرجى التحقق من بريدك الإلكتروني بالنقر على الرابط الذي قمنا بإرساله.</p>
                <p>إذا لم تستلم الرسالة، يمكنك طلب إرسال رابط جديد:</p>

                <!-- عرض رسالة النجاح عند إعادة إرسال الرابط -->
                @if (session('message'))
                    <div class="alert alert-success">
                        {{ session('message') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('verification.send') }}">
                    @csrf
                    <button type="submit" class="btn btn-primary">إعادة إرسال رابط التحقق</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
