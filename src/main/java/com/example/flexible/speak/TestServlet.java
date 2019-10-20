package com.example.flexible.speak;

import javax.servlet.annotation.WebServlet;

import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;


@WebServlet("/test")
@SuppressWarnings("serial")
public class TestServlet extends WebSocketServlet {
	
	

	@Override
	public void configure(WebSocketServletFactory factory) {
		// TODO Auto-generated method stub
		
		factory.register(TestSocket.class);
	}

}
