package de.hydromat.zlidestats;

public class MainThread implements Runnable {

	public static void main(String[] args) {
		(new MainThread()).run();
	}

	@Override
	public void run() {
		Console.logInfo("Neuer Thread gestartet.");
		while (true) {
			try {
				Thread.sleep(1000 * 60 * 60 * 8);
			} catch (InterruptedException e) {
				Console.logError("Fehler im MainThread, starte neuen Thread: " + e.getMessage());
				Console.logInfo("Starte neuen Thread.");

				(new MainThread()).run();
				return;
			}
		}
	}
	
	private void updateDataBase() {
		
	}
}
