<?php
	
	class stdObject {
	    public function __construct(array $arguments = array()) {
	        if (!empty($arguments)) {
	            foreach ($arguments as $property => $argument) {
	                $this->{$property} = $argument;
	            }
	        }
	    }

	    public function __call($method, $arguments) {
	        $arguments = array_merge(array("stdObject" => $this), $arguments); // Note: method argument 0 will always referred to the main class ($this).
	        if (isset($this->{$method}) && is_callable($this->{$method})) {
	            return call_user_func_array($this->{$method}, $arguments);
	        } else {
	            throw new Exception("Fatal error: Call to undefined method stdObject::{$method}()");
	        }
	    }
	}

	function REQUEST_IS_POST() {
		return isset($_SERVER) && isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD']=='POST';
	}

	function VALIDATE_REQUEST() {
		return $_POST['fingerprint'] != '' &&
		'' != $_POST['type'] &&
		'' != $_POST['os_vers'] &&
		'' != $_POST['os_build'] &&
		'' != $_POST['productname'] &&
		'' != $_POST['webkit_vers'] &&
		'' != $_POST['safari_vers'] &&
		'' != $_POST['locale'] &&
		'' != $_POST['timezone'];
	}

	try {
		if (REQUEST_IS_POST() && VALIDATE_REQUEST()){

			$device = new stdObject();

			function sanitize_input($data) {
				$data = trim($data);
				$data = stripslashes($data);
				$data = htmlspecialchars($data);
				return $data;
			}

			$device->fingerprint = sanitize_input($_POST['fingerprint']);
			$device->type = sanitize_input($_POST['type']);
			$device->productname = sanitize_input($_POST['productname']);
			$device->os_vers = sanitize_input($_POST['os_vers']);
			$device->os_build = sanitize_input($_POST['os_build']);
			$device->webkit_vers = sanitize_input($_POST['webkit_vers']);
			$device->safari_vers = sanitize_input($_POST['safari_vers']);
			$device->locale = sanitize_input($_POST['locale']);
			$device->timezone = sanitize_input($_POST['timezone']);
			$device->submission_time = round(microtime(true) * 1000);

			$data = file_get_contents('devices.json');
			$data = json_decode($data_old, true);
			$data[] = $device;
			$data_new = json_encode($data);
			$fp = fopen('devices.json', 'a+');
			fwrite($fp, $data_new);
			fclose($fp);
			header('Content-Type: application/json');
			echo $data_new;
		}
	} catch(Exception $e) {
		echo 'Oops something seems to have gone wrong: '.$e->getMessage().'\n';
	}
?>