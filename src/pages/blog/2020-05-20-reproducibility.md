---
templateKey: blog-post-page
title: "Guest Post: Reproducibility at EMNLP 2020"
date: 2020-05-20
seo:
  title: "Reproducibility at EMNLP 2020"
  description: >- 
    A guest post by Jesse Dodge and Noah A. Smith about reproducibility
    of results in NLP
---

<div class="info-note">

_This is a guest post by Jesse Dodge and Noah A. Smith explaining the
rationale behind the Reproducibility checklist at EMNLP 2020 (shown in
our [call for papers](https://2020.emnlp.org/call-for-papers)), and a
plan for a reproducibility challenge after the conference._

– _EMNLP PC Chairs_

</div>

## Introduction and Motivation

In 2020, natural language processing is largely an experimental field,
and the validity of our field's conclusions rests on the reproducibility
of our experiments. NLP researchers hold a range of different positions
about which questions are the most pressing and which applications have
the greatest potential to aid humanity. Yet, as a scientific community
we have a shared interest in the generalizability of published results.
There are many factors that influence how reproducible our conclusions
are and how well our experimental findings generalize, but these factors
are often underreported when our published papers focus primarily on
presenting new results. As a premier publication forum in our field, the
EMNLP conference is in a position to encourage and incentivize improved
reporting of the information necessary to reproduce published
experimental research. We start from the position that a submission to
EMNLP should contain sufficient information to allow future researchers
to independently reach the same conclusions (for example, about model
performance).

Our focus is on **improved reporting of the setup and results of the
experiments that authors have conducted**, so that a paper will detail
the process by which the authors came to their conclusions and allow
future researchers to understand and build on their work.

## NLP Reproducibility Checklist

We introduce a reproducibility checklist for NLP (shown in the EMNLP
2020 [call for papers](https://2020.emnlp.org/call-for-papers)). Our
checklist builds on the [machine learning reproducibility
checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf),
but is refocused for NLP papers. The machine learning reproducibility
checklist that will be used at NeurIPS 2020 has aligned some items with
ours; we plan to quantitatively analyze our checklist responses, and
this cross-referencing will allow us to compare across communities.

The EMNLP 2020 program committee does not *require* that any items on
the checklist be included in the paper, only that the checklist be
filled out by authors. The filled-out checklist will not be released
with the published version of an accepted paper, it is meant as a tool
for authors and reviewers. There is great variety in the research papers
submitted to our conferences, and some items on the checklist will be
appropriate for only some papers, so "N/A" is an option for all
responses. For example, authors of a submission that introduces a new
dataset but doesn\'t tune any hyperparameters would respond N/A to the
hyperparameter tuning items on the checklist.

A main goal of the checklist is to remind authors about scientifically
relevant items to include in their papers; there is a lot to report, and
it's easy to forget some details when we're focused on explaining and
writing up new results.

Some items on the checklist might be surprising. For example, why report
development set performance? Consider a practitioner trying to
reimplement your approach. If the only performance scores reported are
from the test set, then they will likely need to repeatedly evaluate
models on test data just to verify their implementation. However, test
sets should be consulted minimally as an estimate of generalization
performance, so development set performance is a preferable tool for
this use case.

The checklist also includes the average runtime for each approach, and
the number of parameters in each model. Runtime is a notoriously fickle
measure, but coupled with a description of the computing infrastructure
used (another item on the checklist), it can provide useful information
for a reader who wants an estimate of the computational resources
required to use the methods in the paper. All together, these items are
a step toward reporting time and space complexity of our algorithms,
which are foundational ideas in computer science.

A typical NLP pipeline involves evaluating many models (varying the
model architecture, hyperparameters, etc.) on the development set, and
reporting the best-found performance. Only reporting this single point
discards the results of all-but-one of the finished experiments. These
other trials aren\'t necessarily negative results; instead they reflect
the process which led to the publishable findings. Because there is so
much variety in the methods and budgets used in our field, readers are
often in the dark. The checklist items for hyperparameter tuning results
are meant to illuminate the authors' process.

One item on the checklist is to include source code. This is perhaps the
most straightforward path for others to build upon published work, and
to replicate the specific experiments in a paper. Public code has
facilitated much progress in our field, and as a guide for what to
include in a codebase, Papers With Code recently released a set of
data-driven recommendations which can be found
[here](https://medium.com/paperswithcode/ml-code-completeness-checklist-e9127b168501).

The main focus of NLP papers is to present new research, and our
submissions have limited length. Some authors may find the appendix an
appropriate place to include some of these important technical details
which underlie our work.

## NLP Reproducibility Challenge

Reproducibility in NLP is a multi-faceted challenge that this first
checklist only begins to address. Improving methodological rigor of
scientific work is, like science itself, an incremental process. As a
next step *after* EMNLP 2020, we plan to run the first NLP
Reproducibility Challenge, an open activity aiming to empirically
evaluate the reproducibility of findings presented at EMNLP, and to
identify remaining impediments to reproducibility.

Authors of a "reproduction" will choose a single accepted paper from
EMNLP 2020 and attempt to reproduce the experiments supporting the main
claims from that paper. The authors will report on whether the attempt
was successful, and on what obstacles they found. They will be
encouraged to enumerate the necessary details for replicating the
original work, such as hyperparameter values and the number of GPU hours
required to rerun the experiments. Reproductions submitted as a part of
the challenge will be made publicly available.

The collection of reproductions will act as a useful public resource;
readers of a published paper will be able to read the associated
reproduction report to find relevant information which may have not made
it into the original paper. The focus of these reproductions will be on
clear and appropriate experimental design; with these goals met,
succeeding *or* failing to reproduce the results from the original paper
provides valuable information.

In addition to providing the reproductions as a resource to the
community, writing a reproduction is an excellent educational
opportunity for students to walk through the research process guided by
a published paper. We ran a small-scale reproducibility challenge in the
Winter 2020 graduate-level NLP course at the University of Washington,
in which teams reproduced results from papers published at EMNLP 2019.
Students were provided with a [detailed, structured
template](https://docs.google.com/document/d/1Dd9_VQHXseiroirUI-1rBDS6mJEUHiDQ7ND321O29W8/edit#bookmark=id.7jlbt7bb152)
to help ensure that their reports would include clear information about
experimental design, computational budget, and results found from their
experiments.

Most of the reproductions were successful, though reproducibility in NLP
can be challenging, and the students often had to experiment before they
were able to reproduce the original results. This provided an
opportunity for the students to highlight sources of variation they
found, such as reporting training curves or architectural choices, and
to examine whether the conclusions of the original paper held up with
these variations. This exercise directly informed our design of the
EMNLP 2020 checklist and the 2020 NLP Reproducibility Challenge.

More details about the Reproducibility Challenge will be announced
later.

## Conclusion

Over the past few decades, our field has blossomed from a small,
tight-knit community where methodological best practices were
essentially an oral tradition passed from advisor to student, student to
student, and reviewer to author. This made it easy for new ideas to be
rapidly considered, explored, and adopted. Today, the field is both
increasingly distributed and connected to other fields. Some
community-wide norms exist, but NLP researchers around the world have
diverse perspectives on the factors leading to sound empirical research.
As our field grows and evolves, so too must we update our norms.
Establishing methodology as a central part of our scholarly discourse
will enable informed decisions and consistent community expectations.
This will not only improve the quality of our work, but also make it
easier for students and other newcomers to the field to begin to
meaningfully contribute. We see an evolving checklist as a useful tool
(much like review forms and calls for papers) to help structure that
discourse.
