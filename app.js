
let voters = [];
let democratCandidates = [];
let republicanCandidates = [];
let independentCandidates = [];

  // let voters = [{name: "Steve", ideology: "Liberal"}];
  // let democratCandidates = [{name: "Bill", party: "Democrat", votes: 0}];
  // let republicanCandidates = [{name: "Jason", party: "Republican", votes: 0}];
  // let independentCandidates = [{name: "Mary", party: "Independent", votes: 0}];
  let allCandidates = republicanCandidates.concat(democratCandidates).concat(independentCandidates)
  console.log(allCandidates)

  class Person {
      constructor(name) {
          this.name = name;
      }
  };

  class Voter extends Person {
      constructor(name, ideology) {
      super(name)
      this.ideology = ideology;
      }
  }

  class Candidate extends Person {
      constructor(name, party) {
      super(name)
      this.party = party;
      this.votes = 0;
      }
  }

  // let testCandidate = new Candidate("Jordan", "party")
  // console.log(testCandidate)
  // a.votes = 1
  // console.log

  $(document).ready(function() {  //DOM manipulation code
      $("#voter-form form").submit(function(event){
          event.preventDefault();
          let name = $('#voter-name').val();
          let ideology = $('#voter-ideology').val();
          let newVoter = new Voter(name, ideology);
          voters.push(newVoter);
          // console.log(voters);
          let li = $('<li></li>').text(`${name}, ${ideology}`).addClass( "list-group-item" );
          $('#voter-list ul').append(li);
      });

      $("#candidate-form form").submit(function(event){
          event.preventDefault();
          let name = $('#candidate-name').val();
          let party = $('#candidate-party').val();
          let newCandidate = new Candidate(name, party);
          if(newCandidate.party === 'Democrat') {
              democratCandidates.push(newCandidate);
          } else if (newCandidate.party === 'Independent') {
              independentCandidates.push(newCandidate);
          } else {republicanCandidates.push(newCandidate)};
          console.log("candidate addition",democratCandidates, independentCandidates, republicanCandidates);
          let li = $('<li></li>').text(`${name}, ${party}`).addClass( "list-group-item" );
          $('#candidate-list ul').append(li);
      });

      $('.btn.btn-danger').click(function(){   //NEED TO FIX THIS!!!
          vote(voters);
          // console.log('winner:'+ winner(allCandidates))
          alert(winner(allCandidates));
      });

  });

  function vote(voters){
      voters.forEach(function(choice){
          if(choice.ideology === "Liberal"){
              // console.log(partyVote(.6,.8));
              return pickCandidate(partyVote(.6,.8));
          } else if (choice.ideology === "Neutral") {
              // console.log(partyVote(.5,.75))
              return pickCandidate(partyVote(.5,.75));
          } else {
              // console.log(partyVote(.2,.4))
              return pickCandidate(partyVote(.2,.4));
          }
      });
  }
  function partyVote(a,b){
      let randomNumber = Math.random();
      if (randomNumber < a){
          return 'Democrat'
      }
      else if (randomNumber < b) {
          return 'Independent'
      }
      else {return 'Republican'}

  }
  // foo == null
  function pickCandidate (party='') {
      // console.log(party)
      if (party === 'Democrat') {
          // console.log('test democrat')
          let pick = democratCandidates[Math.floor(Math.random()*democratCandidates.length)];
          pick.votes ++;
          console.log(pick)
      } else if (party === 'Republican') {
          // console.log('test republican')
          let pick = republicanCandidates[Math.floor(Math.random()*republicanCandidates.length)];
          if(pick == null){
              throw 'pick is naught'
          }
          pick.votes ++;
          // console.log(pick);
      } else {
          // console.log('test indy')
          let pick = independentCandidates[Math.floor(Math.random()*independentCandidates.length)];
          pick.votes ++;
          console.log(pick);
      }
  }

  function winner(allCandidates) {
      allCandidates = republicanCandidates.concat(democratCandidates).concat(independentCandidates)
      console.log("all candidates array:"+allCandidates);
      let max = {name: '', votes: 0};
     allCandidates.forEach(function(e){

         (e.votes > max.votes) ? max = e : null;

     })
     return `${max.name} is the winner with ${max.votes} votes!`;
  }
