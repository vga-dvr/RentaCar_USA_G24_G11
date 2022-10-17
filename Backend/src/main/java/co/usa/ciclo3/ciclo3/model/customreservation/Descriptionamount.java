package co.usa.ciclo3.ciclo3.model.customreservation;

public class Descriptionamount {

    private int completed;
    private int cancelled;

    public Descriptionamount(int completed, int cancelled) {
        this.completed= completed;
        this.cancelled= cancelled;
    }

    public int getCompleted() {
        return completed;
    }
    public void serCompleted(int completed) {
        this.completed= completed;
    }

    public int getCancelled() {
        return cancelled;
    }
    public void serCancelled(int cancelled) {
        this.cancelled= cancelled;
    }
}
