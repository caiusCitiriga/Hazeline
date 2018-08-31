import { HazelineTutorialRunner } from 'hazeline';

window.onload = () => {
    const runner = new HazelineTutorialRunner();

    runner.setOverlayBackground('#007bffe6');

    runner.addSection({
        id: 'section-one',
        steps: [
            {
                elementSelector: '#input-1',
                text: 'Type in your email address'
            },
            {
                elementSelector: '#input-2',
                text: 'Then your password',
                onEnd: () => {
                    console.log('Step 2 started');
                    runner.enableScalingAnimation();
                }
            },
            {
                elementSelector: '#input-3',
                text: 'Your current address'
            },
            {
                elementSelector: '#input-4',
                text: 'Check this checkbox out!'
            },
            {
                elementSelector: '#input-5',
                text: 'Click this button!'
            },
            {
                elementSelector: '#input-6',
                text: 'You can also hightlight entire elements',
                onStart: () => {
                    console.log('Step 2 started');
                    runner.disableScalingAnimation();
                    runner.setOverlayBackground('#ff0000ba');
                }
            },
            {
                elementSelector: '#first-paragraph',
                text: 'You can higlight portions of text inside paragraphs'
            },
            {
                elementSelector: '#second-paragraph',
                text: 'You can higlight portions of text inside paragraphs',
            }
        ]
    });

    setTimeout(() => {
        alert('Press OK to start the tour');
        runner.runSection('section-one');
    }, 1000);
}