<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>この度Canada eTA申請サポートをご利用いただきありがとうございます。</title>
</head>
<body>
    <p>
        この度Canada eTA申請サポートをご利用いただきありがとうございます。<br>
        【Canada ETA】様のカナダeTA電子渡航認証の申請状況を再送いたします。
    </p>
    <p>
        □　登録者名　：　【 {{ $application->data['personalDetails']['lastName'] ?? '' }}{{ $application->data['personalDetails']['firstName'] ?? '' }}】様 <br>
        □　登録状況　：　【 {{ $application->status_label }}】<br>
        □　申請日 ：　【 {{ \Carbon\Carbon::parse($application->created_at)->format('Y/m/d') }} 】<br>
        ※申請したeTA有効期限の記載はしておりません。<br>
        詳しくはカナダ政府から届くメールをご確認下さい。<br>
        ※「申請失敗」となっている場合はお手数ですが、申請のやり直しをお願いいたします。<br>
        【Canada eTA　申請サポート 運営会社】<br>
        株式会社はじまりビジネスパートナーズ<br>
        〒338-0001　埼玉県さいたま市中央区上落合2-3-2<br>
        MAIL：{{ config('mail.from.address') }}
    </p>
</body>
</html>
