<?php

namespace App;

enum ApplicationStatus: string
{
    case Pending = 'pending';
    case Success = 'success';
    case Error = 'error';
}
