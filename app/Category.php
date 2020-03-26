<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The items that belong to the category.
     */
    public function items()
    {
        return $this->belongsToMany('App\Item');
    }
}
