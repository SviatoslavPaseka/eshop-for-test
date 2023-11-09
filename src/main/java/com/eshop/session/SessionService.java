package com.eshop.session;

import com.eshop.cart.CartService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SessionService {
    private static final Logger logger = LogManager.getLogger(SessionService.class);
    private Map<String, Session> sessions;


    public SessionService() {
        this.sessions = new ConcurrentHashMap<>();
    }

    public void getSessionsList(){
        for (Map.Entry<String, Session> entry : sessions.entrySet()) {
            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
        }
    }
    
    public void addSession(Session session) {
        sessions.put(session.getSID(), session);
    }

    public void deleteSession(Session session) {
        sessions.remove(session.getSID());
    }

    public Session getSession(String SID) {

        Session session = null;
        if (sessions.containsKey(SID)) {
            session = sessions.get(SID);
        }
        return session;
    }
}
