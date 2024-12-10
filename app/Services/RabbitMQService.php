<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    private $connection;

    private $channel;

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection(
            env('RABBITMQ_HOST', '127.0.0.1'),
            env('RABBITMQ_PORT', 5672),
            env('RABBITMQ_USER', 'guest'),
            env('RABBITMQ_PASSWORD', 'guest'),
            env('RABBITMQ_VHOST', '/')
        );

        $this->channel = $this->connection->channel();
    }

    public function sendMessage(string $exchangeName, string $routingKey, string $message)
    {
        $this->channel->exchange_declare($exchangeName, 'direct', false, true, false);
        $this->channel->queue_declare($routingKey, false, true, false, false);
        $this->channel->queue_bind($routingKey, $exchangeName, $routingKey);

        $msg = new AMQPMessage($message);
        $this->channel->basic_publish($msg, $exchangeName, $routingKey);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
