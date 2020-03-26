<?php

use Illuminate\Database\Seeder;
//use Illuminate\Support\Facades\DB;
use App\Role;
use App\Category;
use App\Item;
use App\CategoryItem;
use App\Status;
use App\User;
use App\RoleUser;
use App\Order;
use App\ItemOrder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        //DB::table('roles')->delete();
        Role::create(['role' => 'admin']);
        Role::create(['role' => 'client']);
        Category::create(['name' => 'cat1', 'description' => 'cat', 'image_path' => 'path']);
        Item::create([
            'name' => 'item1', 'description' => 'item', 'image_path' => 'path',
            'price' => 199.9, 'available' => false, 'discount' => 10
        ]);
        CategoryItem::create(['category_id' => 1, 'item_id' => 1]);
        Status::create(['status' => 'cancelled']);
        User::create(['name' => 'moath', 'email' => 'moath@gmail.com', 'password' => 'm123123123']);
        RoleUser::create(['role_id' => 1, 'user_id' => 1]);
        Order::create(['total' => 1000.5, 'tracking_number' => 'acasfasdadf', 'status_id' => 1, 'user_id' => 1]);
        Order::create(['total' => 1000.5, 'tracking_number' => 'dfsfdsf', 'status_id' => 1]);
        ItemOrder::create(['item_id' => 1, 'order_id' => 1, 'quantity' => 10.5]);


        $category = Category::find(1);
        echo $category . "\n";
        echo $category->items . "\n";
        foreach ($category->items as $item) {
            echo $item->pivot->category_id . "\n";
        }

        $order = Order::find(1);
        echo $order . "\n";
        echo $order->items . "\n";
        echo $order->status . "\n";
        echo $order->user . "\n";
        foreach ($order->items as $item) {
            echo $item->pivot . "\n";
            echo $item->pivot->quantity . "\n";
        }

        $user = User::find(1);
        echo $user . "\n";
        echo $user->orders . "\n";
        echo $user->roles . "\n";
        foreach ($user->roles as $role) {
            echo $role->pivot->role_id . "\n";
        }
        //User::create(['email' => 'foo@bar.com']);
    }
}
