<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The items that belong to the order.
     */
    public function items()
    {
        return $this->belongsToMany('App\Item')->withPivot(['quantity']);
    }

    /**
     * Get the status that of order.
     */
    public function status()
    {
        return $this->belongsTo('App\Status');
    }

    /**
     * Get the user who owns the order.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
