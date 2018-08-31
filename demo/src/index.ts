import { HazelineTutorialRunner } from 'hazeline';

window.onload = () => {
    const runner = new HazelineTutorialRunner();

    runner.addSection({
        id: 'section-one',
        steps: [
            {
                elementSelector: '#test-1',
                text: 'Some text for the step one'
            },
            {
                elementSelector: '#test-2',
                text: 'Some text for the step two'
            },
            {
                elementSelector: '#test-3',
                text: 'Some long text for this step, that should force an overflow. Therefore a scrollbar should appear in the ligthbox paragraph section'
            }
        ]
    });

    (document.getElementById('start') as HTMLButtonElement).addEventListener('click', () => {
        runner.runSection('section-one');
    });
}