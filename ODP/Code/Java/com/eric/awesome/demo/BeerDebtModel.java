package com.eric.awesome.demo;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * An ultra simple model class for the beer debt demo.
 * 
 * This is being kept ultra simple so as to be able to be able to have its
 * values reflected into it, without further issue.
 */
public class BeerDebtModel implements Serializable {
	
	private static final long	serialVersionUID	= 1L;
	
	private String				who;
	private Double				quantity;
	private ArrayList<String>	reasons;
	
	public BeerDebtModel() {

	}
	
	public String getWho() {

		return who;
	}
	
	
	public void setWho( String who ) {

		this.who = who;
	}
	
	public Double getQuantity() {

		return quantity;
	}
	
	public void setQuantity( Double quantity ) {

		this.quantity = quantity;
	}
	
	public ArrayList<String> getReasons() {

		return reasons;
	}
	
	public void setReasons( ArrayList<String> reasons ) {

		this.reasons = reasons;
	}
	
}
