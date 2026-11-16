<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_users_are_redirected_to_login_before_the_dashboard(): void
    {
        $this->get('/dashboard')
            ->assertRedirect('/login');

        $this->get('/')
            ->assertRedirect('/login');
    }

    public function test_authenticated_users_can_access_the_tower_of_hanoi_dashboard(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertOk()
            ->assertSee('Tower of Hanoi')
            ->assertSee('Solve');
    }
}
