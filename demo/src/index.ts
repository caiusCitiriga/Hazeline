import { HazelineTutorialRunner, LightboxPlacement } from 'hazeline';

window.onload = () => {
    const runner = new HazelineTutorialRunner();

    // runner.enableScalingAnimation();
    // runner.setOverlayBackground('#007bffe6');

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
                lightboxPlacement: 'left',
                delayBeforeStart: 2000
            },
            {
                elementSelector: '#input-3',
                text: 'Your current address',
                lightboxPlacement: LightboxPlacement.ABOVE
            },
            {
                elementSelector: '#input-4',
                text: 'Check this checkbox out!',
            },
            {
                elementSelector: '#input-5',
                text: 'Click this button!',
                lightboxPlacement: 'right'
            },
            {
                elementSelector: '#input-6',
                text: 'You can also hightlight entire elements',
                lightboxPlacement: 'ABOVE'
            },
            {
                elementSelector: '#first-paragraph',
                text: 'You can higlight portions of text inside paragraphs'
            },
            {
                elementSelector: '#second-paragraph',
                text: 'You can higlight portions of text inside paragraphs',
                lightboxPlacement: 'ABOVE'
            }
        ]
    });

    runner.runSection('section-one');
}