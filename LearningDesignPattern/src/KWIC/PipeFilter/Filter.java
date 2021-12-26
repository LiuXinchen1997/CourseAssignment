package KWIC.PipeFilter;

public abstract class Filter extends Thread {
	protected Pipe inputPipe; // 过滤器从这里读数据，输入管道
	protected Pipe outputPipe; // 过滤器向这里写数据，输出管道
	private boolean hasStarted = false; // 判断线程有没有开启
	
	public Filter(Pipe inputPipe, Pipe outputPipe) {
		this.inputPipe = inputPipe;
		this.outputPipe = outputPipe;
	}
	
	public void begin() {
		if (!hasStarted) { // 防止被多次调用
			hasStarted = true;
			//Thread thread = new Thread();
			Thread thread = this;
			thread.start();
		}
	}
	
	public void run() { // 采用多线程技术
		try {
			this.convert();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 将输入数据进行转化处理，将处理之后的输出数据 输出到 输出管道中去。
	protected abstract void convert() throws Exception;
}
