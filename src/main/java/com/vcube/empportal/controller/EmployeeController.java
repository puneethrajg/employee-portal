package com.vcube.empportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.empportal.model.Employee;
import com.vcube.empportal.repo.EmployeeRepository;

@CrossOrigin
@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	
	@GetMapping("/getEmployee")
	public List<Employee> getAllEmployeeDetails() {
		
		return employeeRepository.findAll();
	}
	
	@GetMapping("/getEmployee/{eid}")
	public Employee getEmployeeDetails(@PathVariable Integer eid) {
		
		return employeeRepository.findById(eid).orElseThrow();
		
	}
	
	@PostMapping("/createEmployee")
	public Employee createEmployee(@RequestBody Employee employee) {
		
		return employeeRepository.save(employee);
	}
	
	@DeleteMapping("/delEmployee/{eid}")
	public String deleteEmployee(@PathVariable Integer eid) {
		
		employeeRepository.deleteById(eid);
		
		return "The Employee ID :"+eid + " has been deleted successfully!";
	}
	
	
	@PutMapping("/updateEmployee/{eid}")
	public Employee updateEmployee(@RequestBody Employee employee, @PathVariable Integer eid) {
		
		Employee empFromDb = getEmployeeDetails(eid);
		
		empFromDb.setAge(employee.getAge());
		empFromDb.setCity(employee.getCity());
		empFromDb.setEname(employee.getEname());
		empFromDb.setSalary(employee.getSalary());
		empFromDb.setState(employee.getState());
		
		return employeeRepository.save(empFromDb);
		
	}
	
	
	
	
	
	
}
