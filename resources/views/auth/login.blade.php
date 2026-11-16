<x-guest-layout>
    <div class="auth-header">
        <p class="auth-kicker">Welcome back</p>
        <h1>Sign in to play</h1>
        <p class="auth-subtitle">Continue your Tower of Hanoi challenge and keep your streak alive.</p>
    </div>

    <x-auth-session-status class="mb-4 auth-status" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}" class="auth-form">
        @csrf

        <div>
            <x-input-label for="email" :value="__('Email')" class="auth-label" />
            <x-text-input id="email" class="auth-input" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="password" :value="__('Password')" class="auth-label" />
            <x-text-input id="password" class="auth-input"
                type="password"
                name="password"
                required autocomplete="current-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="auth-form-row">
            <label for="remember_me" class="auth-remember">
                <input id="remember_me" type="checkbox" name="remember">
                <span>{{ __('Remember me') }}</span>
            </label>

            @if (Route::has('password.request'))
                <a href="{{ route('password.request') }}" class="auth-link">
                    {{ __('Forgot password?') }}
                </a>
            @endif
        </div>

        <x-primary-button class="auth-submit">
            {{ __('Sign in') }}
        </x-primary-button>

        <p class="auth-footer">
            {{ __('Need an account?') }}
            <a href="{{ route('register') }}" class="auth-link auth-link-strong">{{ __('Create one') }}</a>
        </p>
    </form>
</x-guest-layout>
