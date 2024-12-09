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
            config('queue.connections.rabbitmq.hosts.host'),
            config('queue.connections.rabbitmq.hosts.port'),
            config('queue.connections.rabbitmq.hosts.user'),
            config('queue.connections.rabbitmq.hosts.password'),
            config('queue.connections.rabbitmq.hosts.vhost'),
        );

        $this->channel = $this->connection->channel();
    }

    public function sendMessage(string $queue, string $message)
    {
        $this->channel->queue_declare($queue, false, true, false, false);

        $msg = new AMQPMessage($message);
        $this->channel->basic_publish($msg, '', $queue);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
