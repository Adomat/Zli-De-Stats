package de.hydromat.zlidestats;

import java.util.ArrayList;
import java.util.List;

public class Console {
	private static List<Long> lastMessageTimestamps = new ArrayList<>();
	private static boolean isSpamming;
	
	public static void logError(String message) {
		increaseTimestamps();
		if(isSpamming)
			return;
		
		// TODO Hier soll eine Nachricht via Telegram versendet werden,
		// damit wir Bescheid wissen, wenn es Fehler geschmissen wird!
		
		System.out.println("---------------------------");
		System.out.println("ERROR: " + message);
		System.out.println("---------------------------");
	}

	public static void logInfo(String message) {
		increaseTimestamps();
		if(isSpamming)
			return;
		
		// TODO Diese Methode soll im Prinzip das Selbe tun wie logError(),
		// allerdings soll es keine Error, sondern eine Info Nachricht werden.
		
		System.out.println("---------------------------");
		System.out.println("INFO: " + message);
		System.out.println("---------------------------");
	}
	
	private static void increaseTimestamps() {
		lastMessageTimestamps.add(System.currentTimeMillis());
		if(lastMessageTimestamps.size() > 5) {
			lastMessageTimestamps.remove(5);
		}
		
		if(lastMessageTimestamps.get(0) - lastMessageTimestamps.get(4) < 1000*60*5) {
			isSpamming = true;
		}
	}
}
