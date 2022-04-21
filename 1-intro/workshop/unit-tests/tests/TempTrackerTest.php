<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_insert_single_temp() {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $this->assertEquals(1, $temp_tracker->get_max());
        $this->assertEquals(1, $temp_tracker->get_min());
        $this->assertEquals(1, $temp_tracker->get_mean());
    }
    public function test_insert_multiple_temps() {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $temp_tracker->insert(4);
        $temp_tracker->insert(5);
        $temp_tracker->insert(6);
        $temp_tracker->insert(7);
        $temp_tracker->insert(8);
        $temp_tracker->insert(9);
        $temp_tracker->insert(10);
        $this->assertEquals(10, $temp_tracker->get_max());
        $this->assertEquals(1, $temp_tracker->get_min());
        $this->assertEquals(5.5, $temp_tracker->get_mean());
    }
    public function test_value_error_on_invalid_temp() {
        $temp_tracker = new TempTracker();
        $this->expectException(ValueError::class);
        $temp_tracker->insert(-1);
    }
    public function test_type_error_on_non_int() {
        $temp_tracker = new TempTracker();
        $this->expectException(TypeError::class);
        $temp_tracker->insert('not an int');
    }
    public function test_type_error_on_non_int_in_array() {
        $temp_tracker = new TempTracker();
        $this->expectException(TypeError::class);
        $temp_tracker->insert([1, 'not an int', 3]);
    }
}