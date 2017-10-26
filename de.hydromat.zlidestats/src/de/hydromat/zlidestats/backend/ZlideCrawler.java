package de.hydromat.zlidestats.backend;

import java.util.List;

public class ZlideCrawler implements Runnable {
	
	protected List<ZlideMiner> miners;
	protected long duration;

	public ZlideCrawler(List<ZlideMiner> miners, long duration) {
		this.miners = miners;
		this.duration = duration;
	}
	
	@Override
	public void run() {
		try {
			while (true) {
				for (ZlideMiner m : miners) {
					m.takeSnapshot();
					System.out.println("Snapshot taken");
				}
				System.out.println("Successfully crawled");
				Thread.sleep(duration);
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
