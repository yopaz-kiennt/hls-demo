<?php

namespace App;

enum ApplicationStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Success = 'success';
    case Error = 'error';
}
