<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_flatten_array()
    {
        $array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], flatten($array));
    }
    public function test_flatten_array_with_nested_arrays()
    {
        $array = [1, 2, 3, 4, 5, 6, [7, 8, 9], 10, [11, 12, [13, 14, [15, 16]]]];
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], flatten($array));
    }
    public function test_flatten_array_with_nested_arrays_and_empty_arrays()
    {
        $array = [1, 2, 3, 4, 5, 6, [7, 8, 9], 10, [11, 12, [13, 14, [15, 16]]], []];
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], flatten($array));
    }
    public function test_flatten_array_empty()
    {
        $array = [];
        $this->assertEquals([], flatten($array));
    }
    public function test_flatten_error_on_non_array()
    {
        $this->expectException(TypeError::class);
        $array = 'not an array';
        flatten($array);
    }
    public function test_flatten_error_null()
    {
        $this->expectException(TypeError::class);
        $array = null;
        flatten($array);
    }
}