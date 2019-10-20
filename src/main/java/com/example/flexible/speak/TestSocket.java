package com.example.flexible.speak;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;

public class TestSocket extends WebSocketAdapter {
	
	
	@Override
	public void onWebSocketConnect(Session s) {
		System.out.println("Opened");
	}

	@Override
	public void onWebSocketText(String text) {
		System.out.println(text);
	}
}
