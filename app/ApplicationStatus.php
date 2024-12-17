<?php

namespace App;

enum ApplicationStatus: string
{
    case Pending = 'pending';
    case Active = 'active';
    case Inactive = 'inactive';
}
