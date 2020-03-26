<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /**
     * Get the orders with the status.
     */
    public function orders()
    {
        return $this->hasMany('App\Order');
    }
}
