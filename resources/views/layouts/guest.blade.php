<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800&display=swap" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="auth-body font-sans antialiased">
        <main class="auth-shell">
            <div class="auth-card">
                <div class="auth-visual" aria-hidden="true">
                    <div class="auth-orb orb-one"></div>
                    <div class="auth-orb orb-two"></div>
                    <div class="auth-rings">
                        <span class="ring ring-lg"></span>
                        <span class="ring ring-md"></span>
                        <span class="ring ring-sm"></span>
                    </div>
                </div>

                <div class="auth-brand" aria-label="Tower of Hanoi brand">
                    <a href="{{ url('/') }}" class="auth-brand-link" aria-label="Go back home">
                        <span class="auth-brand-mark">H</span>
                        <div>
                            <span class="auth-brand-name">Tower of Hanoi</span>
                            <small>Strategy puzzle</small>
                        </div>
                    </a>
                </div>

                {{ $slot }}
            </div>
        </main>
    </body>
</html>
