<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tower of Hanoi</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <main class="game-shell">
            <div class="scene-header">
                <button id="help-button" class="circle-button icon-button" type="button" aria-label="Help">
                    <span class="glyph glyph-help">?</span>
                </button>

                <div class="title-badge">
                    <h1 class="game-title">TOWER OF HANOI</h1>
                </div>
            </div>

            <div class="scene-bg" aria-hidden="true">
                <div class="mountain mountain-left"></div>
                <div class="mountain mountain-right"></div>
                <div class="palm palm-one"></div>
                <div class="palm palm-two"></div>
                <div class="palm palm-three"></div>
                <div class="palm palm-four"></div>
                <div class="sand-dune dune-one"></div>
                <div class="sand-dune dune-two"></div>
            </div>

            <div class="play-stage" aria-label="Start area">
                <button id="play-button" class="play-button" type="button" aria-label="Start game">
                    <span class="play-triangle"></span>
                </button>
            </div>

            <div class="game-hud">
                <div class="timer-pill" aria-live="polite">
                    <span class="timer-label">00:00.00</span>
                </div>
            </div>

            <section class="board" aria-label="Tower of Hanoi board">
                <div class="board-glow" aria-hidden="true"></div>

                <div class="tower" data-tower="0" aria-label="Tower A" tabindex="0">
                    <div class="tower-label">A</div>
                    <div class="tower-stack" aria-live="polite"></div>
                </div>

                <div class="tower" data-tower="1" aria-label="Tower B" tabindex="0">
                    <div class="tower-label">B</div>
                    <div class="tower-stack" aria-live="polite"></div>
                </div>

                <div class="tower" data-tower="2" aria-label="Tower C" tabindex="0">
                    <div class="tower-label">C</div>
                    <div class="tower-stack" aria-live="polite"></div>
                </div>
            </section>

            <div class="bottom-controls" role="group" aria-label="Game controls">
                <button id="reset-button" class="action-button" type="button">Restart</button>

                <div class="disk-panel">
                    <button id="decrease-disks" class="tiny-button" type="button" aria-label="Decrease disks">−</button>
                    <label class="disk-control" for="disk-count">
                        <select id="disk-count" aria-label="Select number of rings">
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5" selected>5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </label>
                    <button id="increase-disks" class="tiny-button" type="button" aria-label="Increase disks">＋</button>
                </div>

                <button id="solve-button" class="action-button primary" type="button">Solve</button>
            </div>

            <div class="status-row">
                <div class="status-pill">
                    <span id="move-counter">Moves: 0</span>
                </div>
                <div class="status-pill static">
                    <span id="status-text">Ready to solve</span>
                </div>
            </div>

            <div class="minimum-moves">
                <span id="minimum-moves">Minimum Moves: 31</span>
            </div>

            <div id="result-panel" class="result-panel hidden" aria-live="polite">
                <div class="result-title">Victory!</div>
                <div id="stars" class="stars" aria-label="Win stars"></div>

                <div class="result-stats">
                    <div class="result-stat">
                        <span>Score</span>
                        <strong id="score-value">0</strong>
                    </div>
                    <div class="result-stat">
                        <span>Time</span>
                        <strong id="time-value">0m 00s</strong>
                    </div>
                </div>
            </div>

            <div class="rules-card" aria-live="polite">
                <div class="rules-header">RULES</div>
                <div class="rules-body">
                    <p>
                        THE OBJECT OF THE PUZZLE IS TO MOVE THE ENTIRE STACK TO ANOTHER PLATFORM,
                        OBEYING THE FOLLOWING SIMPLE RULES:
                    </p>
                    <ol>
                        <li>ONLY ONE DISK CAN BE MOVED AT A TIME.</li>
                        <li>EACH MOVE CONSISTS OF TAKING THE UPPER DISK FROM ONE OF THE STACKS AND PLACING IT ON TOP OF ANOTHER STACK, I.E. A DISK CAN ONLY BE MOVED IF IT IS THE UPPERMOST DISK ON A STACK.</li>
                        <li>NO DISK MAY BE PLACED ON TOP OF A SMALLER DISK.</li>
                    </ol>
                </div>
                <button class="check-button" type="button" aria-label="Close rules">✓</button>
            </div>
        </main>
    </body>
</html>
