package com.vcube.empportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.empportal.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	
}
