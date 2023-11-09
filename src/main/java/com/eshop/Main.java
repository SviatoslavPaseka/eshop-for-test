package com.eshop;

import com.eshop.server.Server;
import com.eshop.utils.ConfigLoader;
import org.apache.logging.log4j.LogManager;

public class Main {

    private static org.apache.logging.log4j.Logger logger = LogManager.getLogger(Main.class);

    public static void main(String args[]) {
        String confPath = args[0].replaceAll("-config=", "");
        logger.info("confPath: " + confPath);
        new ConfigLoader(confPath);

        Server server = new Server();
        server.start();
    }

}