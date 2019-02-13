//NOTE: Implementing this on front-end temporarily for a quick contest submission
$(function(){

	var $body = $('body');
	var $playButton = $('#playbutton');

	var $questionDiv = $('.cndce-question');
	var $transcriptionDiv = $('.cndce-transcription');

	var $templateCorrectTranscription = getTemplate($('.cndce-template.correct', $transcriptionDiv));
	var $templateWrongTranscription = getTemplate($('.cndce-template.wrong', $transcriptionDiv));

	var $resultNCorrect = $('.cndce-ncorrect');
	var $resultNWords = $('.cndce-nwords');

	var $resultQuestion = $('.cndce-result-question');

	var $resultActions = $('.cndce-result-actions')
	var $resultActionAgain = $('.cndce-result-action-again', $resultActions);
	var $resultActionNext = $('.cndce-result-action-next', $resultActions);


	// TODO: Implement on server-side
	var questions;
	var iQuestion = 0;


	var currQuestion;



	function getTemplate($template){
		return $template.clone(true).removeClass('cndce-template');
	}


	// TODO: Implement on server-side
	function getNextQuestion(){
		iQuestion++;
		return questions[iQuestion - 1];
	}


	// TODO: Implement on server-side
	function initQuestion(questionObj){
		var questionStr = questionObj.question;

		// Remove punctuation marks
		questionStr = questionStr.replace(/[.!?:;,]/g, '');


		// Split into words
		var words = questionStr.split(' ',-1);	

		questionObj.words = [];

		for(var i=0; i < words.length; i++){
			questionObj.words.push({
				word: words[i]
			})
		}

		return questionObj;
	}

	function nextQuestion(questionObj, triggerPlay){
		currQuestion = initQuestion(questionObj);

		$questionDiv.html(questionObj.question);

		$transcriptionDiv.html('');


		if(triggerPlay)
			$playButton[0].dispatchEvent(new Event('play'));
	}


	// TODO: Implement in server-side
	function parseTranscription(transcription){
		var words = transcription.trim().split(' ');

		$transcriptionDiv.html('');

		var repeatWords = [];
		var nCorrect = 0;

		var wordBool = [];

		for(var i=0; i < words.length && i < currQuestion.words.length; i++){

			if(words[i].toLowerCase() == currQuestion.words[i].word.toLowerCase()){
				currQuestion.words[i].isCorrect = true;

				$transcriptionDiv.append(
					$templateCorrectTranscription
						.clone(true)
						.html(currQuestion.words[i].word + ' ')
				);

				nCorrect++;

				wordBool.push(true);
			}else{
				currQuestion.words[i].isCorrect = false;

				repeatWords.push(currQuestion.words[i].word);

				$transcriptionDiv.append(
					$templateWrongTranscription
						.clone(true)
						.html(words[i] + ' ')
				);

				wordBool.push(false);
			}
		}

		// Add remaining words to wrong words
		for(var i=words.length; i < currQuestion.words.length; i++){
			repeatWords.push(currQuestion.words[i].word);
			wordBool.push(false);
		}

		return {
			nCorrect: nCorrect,
			nWords: currQuestion.words.length,
			repeatWords: repeatWords,
			wordBool: wordBool
		}
	}

	function showResults(result){
		$resultNCorrect.html(result.nCorrect);
		$resultNWords.html(result.nWords);


		$resultActions.removeClass('cndce-complete');
		if(result.nCorrect == result.nWords){
			$resultActions.addClass('cndce-complete');
		}

		$resultQuestion.html('');
		for(var i=0; i < result.wordBool.length; i++){
			if(result.wordBool[i]){
				$resultQuestion.append(
					$templateCorrectTranscription
						.clone(true)
						.html(currQuestion.words[i].word + ' ')
				)
			}else{
				$resultQuestion.append(
					$templateWrongTranscription
						.clone(true)
						.html(currQuestion.words[i].word + ' ')
				)
			}
		}


		currQuestion.question = result.repeatWords.join(' ');

		$body.addClass('show-results');

		$playButton[0].dispatchEvent(new Event('pause'));
	}



	(function initCndceHelper(){
		class CNDCE_SPEECH_TO_TEXT{
			
			static onTranscription(e){
				var result = JSON.parse(e.data);

				// TODO: Implement on server side
				var transcriptionResult = parseTranscription(result.alternatives_[0].transcript_);

				if(result.isFinal_){
					showResults(transcriptionResult);
				}
			}
		}
		window.CNDCE_SPEECH_TO_TEXT = CNDCE_SPEECH_TO_TEXT;
	})();


	// TODO: Implement on server-side
	(function initQuestions(){
		$.ajax({
			dataType: 'json',
			url: './data/questions.json',
			success: function(data){
				questions = data;

				// TODO: Implement on server-side
				nextQuestion(getNextQuestion(), false);
			}
		})
	})();


	(function initPlayButtonListener(){
		$playButton.on('play', function(){
			$body.attr('data-cndce-step', 'question');
			$transcriptionDiv.html('');
		})

		$playButton.on('pause', function(){
			if($body.hasClass('show-results')){
				$body.attr('data-cndce-step', 'results');
				$body.removeClass('show-results');
			}else{
				$body.attr('data-cndce-step', 'instructions');			
			}
		})

	})();

	(function initResultActionsListener(){
		$resultActionAgain.on('click', function(){
			nextQuestion(currQuestion, true);
		})

		$resultActionNext.on('click', function(){
			// TODO: Implement on server-side
			nextQuestion(getNextQuestion(), true);
		})
	})();

})