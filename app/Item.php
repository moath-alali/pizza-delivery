<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * The categories that belong to the item.
     */
    public function categories()
    {
        return $this->belongsToMany('App\Category')->using('App\CategoryItem');
    }

    /**
     * The orders that belong to the item.
     */
    public function orders()
    {
        return $this->belongsToMany('App\Order')->using('App\ItemOrder');
    }
}
