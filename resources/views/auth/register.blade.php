<x-guest-layout>
    <div class="auth-header">
        <p class="auth-kicker">Create account</p>
        <h1>Sign up</h1>
        <p class="auth-subtitle">Join the game and start solving the puzzle with a fresh profile.</p>
    </div>

    <form method="POST" action="{{ route('register') }}" class="auth-form">
        @csrf

        <div>
            <x-input-label for="name" :value="__('Name')" class="auth-label" />
            <x-text-input id="name" class="auth-input" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="email" :value="__('Email')" class="auth-label" />
            <x-text-input id="email" class="auth-input" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="password" :value="__('Password')" class="auth-label" />
            <x-text-input id="password" class="auth-input"
                type="password"
                name="password"
                required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" class="auth-label" />
            <x-text-input id="password_confirmation" class="auth-input"
                type="password"
                name="password_confirmation" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <x-primary-button class="auth-submit">
            {{ __('Create account') }}
        </x-primary-button>

        <p class="auth-footer">
            {{ __('Already have an account?') }}
            <a href="{{ route('login') }}" class="auth-link auth-link-strong">{{ __('Sign in') }}</a>
        </p>
    </form>
</x-guest-layout>
